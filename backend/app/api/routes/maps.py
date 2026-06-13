import os
import sqlite3
from fastapi import APIRouter, HTTPException, Response

router = APIRouter(
    prefix="/maps",
    tags=["maps"]
)

# Target the exact folder path where your database resides
DB_PATH = "/home/streetfighter/Data/personal_project/drone_platform/backend/app/maps/east-java.sqlitedb"

def get_tile_from_db(z: int, x: int, y: int):
    if not os.path.exists(DB_PATH):
        return None
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        # RMaps/BigMap .sqlitedb format uses TMS tile calculation (Inverted Y)
        # If your tiles still appear mismatched, remove this line to use raw Y
        y = (1 << z) - 1 - y

        # Query structure for standard RMaps/BigMap tile tables
        cursor.execute(
            "SELECT image FROM tiles WHERE z=? AND x=? AND y=?", 
            (z, x, y)
        )
        row = cursor.fetchone()
        if row:
            return row[0]
    except Exception as e:
        print(f"Database offline tile error: {e}")
    finally:
        conn.close()
    return None

@router.get("/tiles/{z}/{x}/{y}.png")
async def get_offline_tile(z: int, x: int, y: int):
    tile_bytes = get_tile_from_db(z, x, y)
    
    if tile_bytes is None:
        raise HTTPException(status_code=404, detail="Tile not found in cache")
        
    return Response(content=tile_bytes, media_type="image/png")