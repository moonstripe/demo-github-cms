/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Post {
  slug: string,
  date: string,
  title: string
}

export const handler: Handlers = {
  async GET(req, ctx) {

      const blogArticles: Post[] = [];

      for await (const item of Deno.readDir('content/')) {
          if (item.isFile) {
              // console.log(item.name)
              const path = `content/${item.name}`
              const file = await Deno.readTextFile(path);
              const titleString = file.split("\n")[0];
              const dateString = file.split("\n")[2]

              blogArticles.push({
                  slug: item.name,
                  date: dateString,
                  title: titleString
              });
          }
      }

      return ctx.render({ blogArticles })
  },
};

export default ({ data }: PageProps) => {
  return (
      <Fragment>
          <h1>Thoughts</h1>
          {
              data.blogArticles.map((e: Post) => (
                  <div>
                      <a href={`/${e.slug.split('.')[0]}`}>
                          <h1>{e.title.slice(2, e.title.length)}</h1>
                          <p>{e.date}</p>
                      </a>
                  </div>
              ))
          }
      </Fragment>
  );
}
