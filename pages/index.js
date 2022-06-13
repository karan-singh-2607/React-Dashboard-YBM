import Head from 'next/head';
import { Provider } from 'react-redux';
import Routing from '../Auth Gard/Routing';
// import RootContainer from '../Layout/Root Layout';
import styles from '../styles/Home.module.css';
import store from '../_helpers/store';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>YBM</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" type="image/x-icon" />
      </Head>

      <main className={styles.main}>
        <Routing />
        {/* <Provider store={store}>
          <Routing />
        </Provider> */}
      </main>
    </div>
  );
}