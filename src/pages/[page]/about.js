import Head from "next/head";
import React from "react";
import styles from '../../../styles/Home.module.css'
import { Container } from 'react-bootstrap'
import useTranslation from "next-translate/useTranslation";

const About = () => {

  const { t } = useTranslation();

  return (<>
    <Head>
      <title>About</title>
    </Head>
    <h1>{t("common:Page")}</h1>
    <div className="">
      <main className="">

        <h1>This is About Page </h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

     </p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis aperiam beatae ad cum consequuntur tempore pariatur laboriosam mollitia. Explicabo amet sunt beatae odio earum voluptatem iure eos necessitatibus blanditiis maiores?</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci iure, nesciunt voluptatibus, voluptates quo delectus, quae repellat est dolorum quis doloribus saepe illum odit nulla. Numquam commodi molestiae velit adipisci!</p>
      </main>

    </div>
  </>);
}

export default About;