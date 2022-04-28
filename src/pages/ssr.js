import * as React from "react"

import Layout from "../components/layout"
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../components/ui"

export default function Page(props) {
  return (
    <Layout {...props}>
      <Container>
        <Box paddingY={5}>
          <Heading as="h1" center>
            Randon Dog
          </Heading>
          <Space size={4} />
          <Box center>
            <Flex>
              <img alt="Happy dog" src={props.serverData.dogImage.message} />
            </Flex>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}

export async function getServerData() {
  const res = await fetch(`https://dog.ceo/api/breeds/image/random`)
  const data = await res.json()
  return {
    props: {
      dogImage: data,
    },
  }
};