import * as React from "react"
import { Link, graphql, navigate } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const [posts, setPosts] = React.useState([])
  const [currentTag, setCurrentTag] = React.useState(
    undefined || location.state?.currentTag
  )

  const [sidebarData, setSidebarData] = React.useState({
    tags: [],
  })

  React.useEffect(() => {
    let tmpPosts = []
    data.allMarkdownRemark.nodes.forEach(node => {
      const frontmatter = node.frontmatter
      if (!frontmatter.isDraft) {
        let isTagged = false
        frontmatter.tag?.forEach(tag => {
          if (currentTag === undefined || currentTag === tag) {
            isTagged = true
          }
        })
        if (isTagged) tmpPosts.push(node)
      }
    })
    setPosts(tmpPosts)
  }, [currentTag, data.allMarkdownRemark.nodes])

  // TODO: refactor out sidebar component
  React.useEffect(() => {
    const tmpSidebarData = {
      tags: [],
    }
    data.allMarkdownRemark.nodes.forEach(node => {
      const frontmatter = node.frontmatter
      if (!frontmatter.isDraft) {
        frontmatter.tag?.forEach(tag => {
          if (!tmpSidebarData.tags.includes(tag)) {
            tmpSidebarData.tags.push(tag)
          }
        })
      }
    })
    setSidebarData(tmpSidebarData)
  }, [data.allMarkdownRemark.nodes])

  const onTagClick = (e, toggleOn, tag) => {
    if (location.state?.currentTag) {
      navigate(".")
    }
    if (toggleOn) {
      setCurrentTag(tag)
    } else {
      setCurrentTag(undefined)
    }
  }

  return (
    <Layout
      location={location}
      title={siteTitle}
      data={sidebarData}
      onTagClick={onTagClick}
      currentTag={currentTag}
    >
      <Seo title="All posts" />
      <Bio />
      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
                <section className="index-tags">
                  tags:{" "}
                  {post.frontmatter.tag.map(t => (
                    <span className="tag">{t} </span>
                  ))}
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          tag
          isDraft
        }
      }
    }
  }
`
