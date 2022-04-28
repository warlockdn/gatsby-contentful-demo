import * as React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../../components/layout"
import {
  Container,
  Flex,
  Box,
  Space,
  Heading,
  Text,
  Avatar,
} from "../../components/ui"
import { avatar as avatarStyle } from "../../components/ui.css"
import * as styles from "./../../templates/blog-post.css"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { graphql } from "gatsby"

export default function BlogPost(props) {
  const blog = props.data.contentfulBlogPost;
  return (
    <Layout {...props} description={blog.excerpt}>
      <Container>
        <Box paddingY={5}>
          <Heading as="h1" center>
            {blog.title}
          </Heading>
          <Space size={4} />
          {blog.author && (
            <Box center>
              <Flex>
                {blog.author.avatar &&
                  (!!blog.author.avatar.gatsbyImageData ? (
                    <Avatar
                      {...blog.author.avatar}
                      image={blog.author.avatar.gatsbyImageData}
                    />
                  ) : (
                    <img
                      src={blog.author.avatar.url}
                      alt={blog.author.name}
                      className={avatarStyle}
                    />
                  ))}
                <Text variant="bold">{blog.author.name}</Text>
              </Flex>
            </Box>
          )}
          <Space size={4} />
          <Text center>{blog.date}</Text>
          <Space size={4} />
          {blog.image && (
            <GatsbyImage
              alt={blog.image.alt}
              image={blog.image.gatsbyImageData}
            />
          )}
          <Space size={5} />
          <div className={styles.blogPost}>
            {documentToReactComponents(JSON.parse(blog.body?.raw))}
          </div>
        </Box>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query BlogPost($slug: String) {
    contentfulBlogPost(slug: { eq: $slug }) {
      contentful_id
      slug
      title
      date
      category
      body {
        raw
      }
      image {
        id
        alt
        gatsbyImageData(
          placeholder: BLURRED
        )
      }
      excerpt {
        excerpt
      }
    }
  }
`;