import { useRouter } from 'next/router'
import { FirebaseError } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import { useAuthContext } from '@src/feature/auth/provider/AuthProvider'
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
import Link from 'next/link'

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
      push('/signin')
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
          <Link href={'/'} passHref>
            <chakra.a _hover={{ opacity: 0.8 }}>
              <Heading color={'white'}>Firebase Realtime Chat</Heading>
            </chakra.a>
          </Link>
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
            <Link href={'/signin'} passHref>
              <Button colorScheme={'teal'} as={'a'}>
                サインイン
              </Button>
            </Link>
          )}
        </Flex>
      </Container>
    </chakra.header>
  )
}
