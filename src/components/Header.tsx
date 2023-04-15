import { FirebaseError } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
import { Navigate } from '@src/components/Navigate'
import { useRouter } from '@src/hooks/useRouter'
import {
  Avatar,
  Button,
  Container,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  chakra,
  useToast,
} from '@chakra-ui/react'

export const Header = () => {
  const { user } = useAuthContext()
  const { push } = useRouter()
  const toast = useToast()

  const handleSignOut = async () => {
    try {
      const auth = getAuth()
      await signOut(auth)
      toast({
        title: 'ログアウトしました',
        status: 'success',
        position: 'top',
      })
      push((path) => path.signin.$url())
    } catch (e) {
      if (e instanceof FirebaseError) {
        console.log(e)
      }
    }
  }

  return (
    <chakra.header py={4} bgColor={'blue.500'}>
      <Container maxW={'container.lg'}>
        <Flex>
          <Navigate href={(path) => path.$url()}>
            <Heading color={'white'} _hover={{ opacity: 0.8 }}>
              Firebase Realtime Chat
            </Heading>
          </Navigate>
          <Spacer aria-hidden />
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar flexShrink={0} width={10} height={10} />
              </MenuButton>
              <MenuList py={0}>
                <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Navigate href={(path) => path.signin.$url()}>
              <Button colorScheme={'teal'}>サインイン</Button>
            </Navigate>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}
