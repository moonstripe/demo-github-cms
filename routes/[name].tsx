/** @jsx h */
import { h, Fragment } from "preact";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Marked } from "markdown";
import Post from '../islands/Post.tsx'

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url).pathname.split('/')
    const file = url[1]

    const decoder = new TextDecoder("utf-8");
    const markdown = decoder.decode(await Deno.readFile(`./content/${file}.md`));
    const markup = Marked.parse(markdown)

    return ctx.render({ markup: markup.content })
  },
};


export default ({ data }) => {
  return (
    <Fragment>
      <a href='/'>back to home</a>
      <Post markup={data.markup}/>
    </Fragment>
  );
}