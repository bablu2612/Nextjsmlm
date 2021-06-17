import useTranslation from "next-translate/useTranslation";
import Head from "next/head";



const Contactus = () => {
  const { t } = useTranslation();

  return (<>
    <Head>
      <title>Contactus</title>
    </Head>
    <h1>{t("common:Page")}</h1>

    <h1>Contactus page</h1>
  </>);
}

export default Contactus;