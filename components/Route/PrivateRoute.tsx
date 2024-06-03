import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { useSession } from "next-auth/react"

export default function PrivateRoute() {
  return (
    <div>PrivateRoute</div>
  )
}
