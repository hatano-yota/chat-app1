import { useState } from 'react'
import { useRouter } from 'next/router'
import { FirebaseError } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { Button, Container, Heading, chakra, useToast } from '@chakra-ui/react'

export const Header = () => {
  const { user } = useAuthContext()
  const { push } = useRouter()
  const toast = useToast()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'ログアウトしました',
        status: 'success',
        position: 'top',
      })
      push('/signin')
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <chakra.header py={4} bgColor={'blue.500'}>
      <Container maxW={'container.lg'}>
        <Heading color={'white'}>
          {user ? (
            <Button
              colorScheme={'teal'}
              onClick={handleSignOut}
              isLoading={isLoading}
            >
              サインアウト
            </Button>
          ) : (
            'ログアウト中'
          )}
        </Heading>
      </Container>
    </chakra.header>
  )
}
