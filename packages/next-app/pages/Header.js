import Head from "next/head";

function Header() {
  return (
    <Head>
      <title>DDiary</title>
      <meta
        name="description"
        content="Keep your diary in web3! 💜"
      />
      <link rel="icon" href="/unicorn.png" />
      <meta property="og:title" content="DDiary" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="DDiary"></meta>
      <meta
        property="og:description"
        content="Keep your diary in web3! 💜"
      />
      <meta
        property="og:image"
        content="https://i.ibb.co/TTB4pHk/Screenshot-2022-05-25-at-1-38-57-PM.png"
      />
      <meta
        property="og:image:url"
        content="https://i.ibb.co/TTB4pHk/Screenshot-2022-05-25-at-1-38-57-PM.png"
      />

      <meta
        property="og:image:secure_url"
        content="https://i.ibb.co/TTB4pHk/Screenshot-2022-05-25-at-1-38-57-PM.png"
      />
      <meta name="twitter:title" content="DDiary" />
      <meta
        name="twitter:description"
        content="Keep your diary in web3! 💜"
      />
      <meta name="twitter:url" content="https://web3starterkit.vercel.app/" />
      <meta
        name="twitter:image:src"
        content="https://i.ibb.co/TTB4pHk/Screenshot-2022-05-25-at-1-38-57-PM.png"
      />
      <meta
        name="twitter:card"
        content="https://i.ibb.co/TTB4pHk/Screenshot-2022-05-25-at-1-38-57-PM.png"
      />
      <meta name="twitter:image:alt" content="DDiary" />
    </Head>
  );
}

export default Header;
