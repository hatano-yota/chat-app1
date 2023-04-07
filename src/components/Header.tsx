import { Container, Heading, chakra } from '@chakra-ui/react'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'

export const Header = () => {
  const { user } = useAuthContext()

  return (
    <chakra.header py={4} bgColor={'blue.500'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>
          {user ? 'ログイン中' : 'ログアウト中'}
        </Heading>
      </Container>
    </chakra.header>
  )
}
