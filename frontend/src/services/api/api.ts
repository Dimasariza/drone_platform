import axios from "axios"
import { toast } from "sonner"

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

api.interceptors.response.use(
  (response) => {

    // success message
    if (response.config.method !== "get") {
      toast.success("Request success")
    }

    return response
  },

  (error) => {

    // server responded
    if (error.response) {

      const status = error.response.status

      switch (status) {

        case 400:
          toast.error("Bad Request")
          break

        case 401:
          toast.error("Unauthorized")
          break

        case 403:
          toast.error("Forbidden")
          break

        case 404:
          toast.error("API Route Not Found")
          break

        case 500:
          toast.error("Internal Server Error")
          break

        default:
          toast.error(
            error.response.data?.detail ||
            "Something went wrong"
          )
      }

    }

    // no response
    else if (error.request) {

      toast.error(
        "Cannot connect to backend server"
      )

    }

    // unknown
    else {

      toast.error(error.message)

    }

    return Promise.reject(error)
  }
)