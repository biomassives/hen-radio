import AllTracksView from '../components/views/all-tracks-view';
import getAllTracks from '../api/get-all-tracks';
import Head from 'next/head';
import {getBlockedTracks, getBlockedWallets} from '../api/get-blocked-lists';
import getAllTracksCount from '../api/get-all-tracks-count';
import Pagination from '../components/pagination';

const filterBannedTracks = (allTracks, blockedWallets, blockedObjkts) =>
    allTracks.filter(t => (
        !blockedWallets.data.includes(t.creator_id) &&
        !blockedObjkts.data.includes(t.id)
    ));

export const getStaticProps = async() => {
    const [allTracks, count, blockedObjkts, blockedWallets] = await Promise.all([
        getAllTracks(),
        getAllTracksCount(),
        getBlockedTracks(),
        getBlockedWallets(),
    ]);

    const tracks = filterBannedTracks(
        allTracks,
        blockedWallets,
        blockedObjkts
    );

    return {
        props: {tracks, count},
        revalidate: 300
    };
};

const AllTracksPage = ({tracks, count}) => {
    const title = 'Listen to Hen Radio';
    const description = 'Hic et Nunc NFT audio player, all tracks';
    const image = 'https://hen.radio/images/hen-radio-logo-social.png';
    const url = 'https://hen.radio';

    return <>
        <Head>
            <meta charSet="utf-8"/>
            <title>Hen Radio | NFT Music Player</title>
            <meta name="description" content={description}/>
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
            <meta
                name="viewport"
                content="initial-scale=1.0, width=device-width"
            />
        </Head>
        <AllTracksView tracks={tracks} objkt={null}/>
        <Pagination total={count} currentPage={1} limit={250} />
    </>;
};

export default AllTracksPage;


