import { supabase } from '../utils/supabase'
import { LogoutIcon, ExclamationCircleIcon } from '@heroicons/react/solid'

export const DashBoard: React.FC = () => {
  const signOut = () => {
    supabase.auth.signOut()
  }
  return (
    <div>
      <LogoutIcon
        onClick={signOut}
        className="my-6 h-6 w-6 cursor-pointer text-blue-500"
      ></LogoutIcon>
    </div>
  )
}
