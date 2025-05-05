import React, { ReactNode } from 'react'
import { RWebShare } from 'react-web-share';

const ShareButton = ({ text, url, title, children }: {
    text: string;
    url: string;
    title: string;
    children: ReactNode;
}) => {
    return (
        <RWebShare
            data={{
                text: `${text}`,
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/form/${url}`,
                title: `${title} Form`,
            }}
            onClick={() => console.log("shared successfully!")}
        >
            {children}

        </RWebShare>
    )
}

export default ShareButton;