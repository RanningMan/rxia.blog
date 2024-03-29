import * as React from "react"
import { Link, Script } from "gatsby"

const Layout = ({
  data,
  location,
  title,
  onTagClick,
  currentTag,
  children,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  let rootPathSideBar = null
  let blogSideBar = null

  if (data) {
    const tags = data.tags

    const SideBar = tagsElement => {
      return (
        <aside>
          <div className="side-bar">
            <p>Tags</p>
            <div className="tag-list">{tagsElement}</div>
          </div>
        </aside>
      )
    }

    rootPathSideBar = SideBar(
      tags.map(tag => (
        <span
          className={
            tag === currentTag ? "tag tag-selected" : "tag tag-unselected"
          }
          tabIndex="0"
          key={tag}
          role="button"
          onKeyDown={e => {
            if (e.keyCode === 13) onTagClick(e, tag !== currentTag, tag)
          }}
          onClick={e => onTagClick(e, tag !== currentTag, tag)}
        >
          {tag}
        </span>
      ))
    )

    blogSideBar = SideBar(
      tags.map(tag => {
        return (
          <Link className="tag" to={`/`} state={{ currentTag: tag }}>
            {tag}
          </Link>
        )
      })
    )
  }

  return (
    <>
      <Script type="text/javascript">
        {typeof window !== "undefined" &&
          (function (c, l, a, r, i, t, y) {
            c[a] =
              c[a] ||
              function () {
                ;(c[a].q = c[a].q || []).push(arguments)
              }
            t = l.createElement(r)
            t.async = 1
            t.src = "https://www.clarity.ms/tag/" + i
            y = l.getElementsByTagName(r)[0]
            y.parentNode.insertBefore(t, y)
          })(window, document, "clarity", "script", "fglh70hp4i")}
      </Script>
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <header className="global-header">{header}</header>
        <div className="content-wrapper">
          <main data-is-root-path={isRootPath}>{children}</main>
          {isRootPath ? rootPathSideBar : blogSideBar}
        </div>
        <footer>
          © {new Date().getFullYear()}, Built by Ran Xia with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

export default Layout
