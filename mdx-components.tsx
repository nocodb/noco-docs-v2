import defaultMdxComponents from 'fumadocs-ui/mdx';
import type {MDXComponents} from 'mdx/types';
import {ImageZoom} from 'fumadocs-ui/components/image-zoom';
import {Callout} from './components/mdx/Callout';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        ...defaultMdxComponents,
        img: (props) => <ImageZoom {...(props as any)} />,
        ...components,
        Callout: (props) => <Callout {...(props as any)} />,
    };
}
