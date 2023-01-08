import * as React from "react"
import { Link, graphql } from "gatsby"
import { Disqus } from "gatsby-plugin-disqus"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const layoutData = {
    tags: [],
  }

  const frontmatter = data.markdownRemark.frontmatter
  frontmatter.tag?.forEach(tag => {
    if (!layoutData.tags.includes(tag)) {
      layoutData.tags.push(tag)
    }
  })

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
          <div className="tag-list">
            {layoutData.tags.map(tag => (
              <div className="tag">{tag}</div>
            ))}
          </div>
        </header>
        <section
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <Disqus
          config={{
            /* Replace PAGE_URL with your post's canonical URL variable */
            url: location.href,
            /* Replace PAGE_IDENTIFIER with your page's unique identifier variable */
            identifier: location.pathname,
            /* Replace PAGE_TITLE with the title of the page */
            title: post.frontmatter.title,
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && !previous.frontmatter.isDraft && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && !next.frontmatter.isDraft && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tag
        isDraft
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        isDraft
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
        isDraft
      }
    }
  }
`
