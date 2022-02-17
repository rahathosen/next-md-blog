import fs from "fs";
import path from "path";
import Head from "next/head";
import matter from "gray-matter";
import Post from "../components/Post";
import { sortByDate } from "../utils";
export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Next Blog </title>
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join("posts"));

  //get slug and frontmatter from post
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");

    //get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
