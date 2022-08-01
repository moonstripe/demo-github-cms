
/** @jsx h */
import { h, Fragment } from "preact";
import { tw } from "@twind";
import { useRef, useLayoutEffect } from "preact/hooks";

export default function Post({ markup }) {
    const el = useRef<HTMLDivElement>(null)
    
    useLayoutEffect(() => {
        if (el.current) {
            el.current.innerHTML = markup;
        }

    }, [])

    return (
        <Fragment>
            <article ref={el} />
        </Fragment>
    );
}