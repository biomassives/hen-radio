import AllTracksView from '../components/views/all-tracks-view';
import getAllTracks from '../api/get-all-tracks';
import Head from 'next/head';
import logo from '../public/images/hen-radio-logo-social.png';

export const getServerSideProps = async() => {
    const tracks = await getAllTracks();

    return {props: {tracks}};
};

const AllTracksPage = ({tracks}) => {
    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc NFT audio player, all tracks';
    const image = 'https://hen.radio/_next/image?url=%2Fimages%2Fhen-radio-logo-social.png&w=1024&q=75';
    const url = 'https://hen.radio';

    return <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Hen Radio | NFT Music Player</title>
            <link rel="canonical" href={`http://hen.radio`}/>
            <meta name="twitter:card" content="summary"/>
            <meta name="twitter:site" content="@hen_radio"/>
            <meta name="twitter:creator" content="@hen_radio"/>
            <meta name="twitter:title" content={title}/>
            <meta
                name="twitter:description"
                content={description}
            />
            <meta
                name="twitter:image"
                content={image}
            />
            <meta property="og:title" content={title}/>
            <meta property="og:url" content={url}/>
            <meta property="og:type" content="gallery"/>
            <meta
                property="og:description"
                content={description}
            />
            <meta
                property="og:image"
                content={image}
            />
            <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
        </Head>
        <AllTracksView tracks={tracks} objkt={null}/>
    </>;
};

export default AllTracksPage;


