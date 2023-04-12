import type { ReactNode } from 'react'
import { useAuthContext } from '../provider/AuthProvider'
import { useRouter } from '@src/hooks/useRouter'
import { Box } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const AuthGuard = ({ children }: Props) => {
  const { user } = useAuthContext()
  const { push } = useRouter()

  if (user === undefined) {
    return <Box>読み込み中...</Box>
  }

  if (user === null) {
    push((path) => path.signin.$url())
    return null
  }

  return <>{children}</>
}
