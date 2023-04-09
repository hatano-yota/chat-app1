import { chakra, Container, Flex } from '@chakra-ui/react'
import { Navigate } from './Navigate'

export const Footer = () => {
  return (
    <chakra.footer py={4} bgColor={'blue.600'} color={'white'}>
      <Container maxW={'container.lg'}>
        <Flex flexDirection={'column'} gap={2} alignItems={'start'}>
          <Navigate href={(path) => path.$url()}>
            <chakra.p lineHeight={1}>トップページ</chakra.p>
          </Navigate>
          <Navigate href={(path) => path.signin.$url()}>
            <chakra.p lineHeight={1}>サインイン</chakra.p>
          </Navigate>
          <Navigate href={(path) => path.signup.$url()}>
            <chakra.p lineHeight={1}>サインアップ</chakra.p>
          </Navigate>
          <Navigate href={(path) => path.chat.$url()}>
            <chakra.p lineHeight={1}>チャット</chakra.p>
          </Navigate>
        </Flex>
      </Container>
    </chakra.footer>
  )
}
