// Adapted from the course engine's INTROWEB m1a1 Vitest/jsdom checks.
// See NOTICE for source attribution and license information.
import { describe, expect, it } from "vitest"
import { existsSync, readFileSync } from "node:fs"
import { JSDOM } from "jsdom"

const src = new URL("../src/", import.meta.url)
const html = existsSync(new URL("index.html", src)) ? readFileSync(new URL("index.html", src), "utf8") : ""
const page = new JSDOM(html).window.document
const identity = JSON.parse(readFileSync(new URL("../student.json", import.meta.url), "utf8"))
const meta = (name) => page.querySelector(`head meta[name="${name}"]`)?.getAttribute("content")?.trim() ?? ""
const sheet = () => [...page.querySelectorAll("head link[rel~=stylesheet]")].map((l) => l.getAttribute("href") ?? "")
const comments = () => {
  const w = page.createTreeWalker(page, 128); let n = 0
  while (w.nextNode()) n++
  return n
}

const skeleton = () => {
  it("declares the HTML5 doctype, English and UTF-8", () => {
    expect(page.doctype?.name.toLowerCase(), "Start with <!DOCTYPE html>.").toBe("html")
    expect(page.documentElement.getAttribute("lang"), "Set lang=\"en\".").toBe("en")
    expect(page.querySelector("head meta[charset]")?.getAttribute("charset")?.toLowerCase()).toBe("utf-8")
  })
  it("has a viewport meta element and a meta description", () => {
    expect(meta("viewport"), "Add the viewport meta element.").toMatch(/width=device-width/)
    expect(meta("description").length, "Write a meta description.").toBeGreaterThan(10)
  })
}

describe("M2A1: Anatomy of a Page", () => {
  skeleton()
  it("is titled Club Notice", () => {
    expect(page.title.trim()).toBe("Club Notice")
  })
  it("has one h1, inside the header", () => {
    expect(page.querySelectorAll("h1").length, "Use exactly one h1.").toBe(1)
    expect(page.querySelector("body > header h1"), "Put the h1 in the header.").not.toBeNull()
  })
  it("has a main with two sections, each with an h2, and a footer", () => {
    const sections = [...page.querySelectorAll("body > main > section")]
    expect(sections.length, "Add two section elements in main.").toBeGreaterThanOrEqual(2)
    for (const s of sections) expect(s.querySelector("h2"), "Give each section an h2.").not.toBeNull()
    expect(page.querySelector("body > footer"), "Add a footer.").not.toBeNull()
  })
  it("labels the parts with comments and links style.css", () => {
    expect(comments(), "Add a comment before each part.").toBeGreaterThanOrEqual(3)
    expect(sheet(), "Link style.css from the head.").toContain("style.css")
    expect(existsSync(new URL("style.css", src)), "Keep src/style.css.").toBe(true)
  })
})

describe("Student identity in your private copy", () => {
  it("contains the required details as non-empty text", () => {
    for (const field of ["fullName", "studentNumber", "studentEmail", "classCode", "githubAccount", "room", "pcNumber"]) {
      expect(typeof identity[field], `Keep ${field} as text.`).toBe("string")
      expect(identity[field]?.trim(), `Fill in ${field} in student.json.`).toBeTruthy()
    }
  })

  it("uses class code 2006", () => {
    expect(identity.classCode).toBe("2006")
  })
})
