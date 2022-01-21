import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" type="image/webp" href="/favicon.ico   " />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800&amp;display=swap" rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet" defer/>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument