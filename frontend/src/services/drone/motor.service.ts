import { api } from "../api/api";

export async function testMotor(
  motorNumber: number
) {
  return api.post(
    `/motor/${motorNumber}`
  )
}