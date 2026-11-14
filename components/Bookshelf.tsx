"use client"

import Link from "next/link"
import type { CSSProperties } from "react"
import styles from "./Bookshelf.module.css"

const books = [
  { label: "Start", title: "Hoofdinterface", href: "/home", height: "58%", color: "#FF97D0" },
  { label: "Project 1", title: "Leporello", href: "/project-1", height: "82%", color: "#FDC5C6" },
  { label: "Project 2", title: "Fibonacci", href: "/project-2", height: "89%", color: "#C3F380" },
  { label: "Project 3", title: "Akoestische laptop", href: "/project-3", height: "82%", color: "#FAE170" },
  { label: "Project 4", title: "Belgische poolexpedities", href: "/project-4", height: "89%", color: "#FF97D0" },
  { label: "Over mij", title: "Over de maker", href: "/about", height: "96%", color: "#FDC5C6" },
]

export default function Bookshelf() {
  return (
    <nav className={styles.shelf} aria-label="Boeken met mijn projecten">
      {books.map((book, index) => (
        <Link
          key={book.href}
          href={book.href}
          className={styles.book}
          aria-label={`${book.label}: ${book.title}`}
          style={{ '--height': book.height, '--cover': book.color } as CSSProperties}
        >
          <div className={styles.spine} aria-hidden="true">
            <span className={styles.subtitle}>{book.title}</span>
            <span className={styles.label}>{book.label}</span>
            <span className={styles.number}>{index + 1}</span>
          </div>
          <div className={styles.cover} aria-hidden="true">
            <span className={styles.coverLabel}>{book.label}</span>
            <span className={styles.coverTitle}>{book.title}</span>
            <span className={styles.open}>Bekijken ↗</span>
          </div>
        </Link>
      ))}
    </nav>
  )
}
