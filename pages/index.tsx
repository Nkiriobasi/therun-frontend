import styles from "../components/css/Home.module.scss";
import { Button, Col, Row } from "react-bootstrap";
import { PopularGames } from "../components/game/popular-games";
import { DataHolder } from "../components/frontpage/data-holder";
import { SkeletonPersonalBests } from "../components/skeleton/index/skeleton-personal-bests";
import { SkeletonPopularGames } from "../components/skeleton/index/skeleton-popular-games";
import useSWR from "swr";
import React from "react";
import { PatreonBunnySvgWithoutLink } from "./patron";
import Link from "next/link";

export const fetcher = (...args: string[]) =>
    // eslint-disable-next-line github/no-then
    fetch(...args).then((res) => res.json());

const Home = () => {
    return (
        <div>
            <div className={styles.homeContainer}>
                <h1 className={styles.title}>The Run</h1>
                <div className={styles.subtitle}>
                    Statistics for speedrunners
                </div>
                <div className={styles.learnMoreButtonContainer}>
                    <Link href={"/patron"}>
                        <Button
                            variant={"primary"}
                            className={styles.supportMeButton}
                        >
                            Support <PatreonBunnySvgWithoutLink />
                        </Button>
                    </Link>
                    <Link href={"/about"}>
                        <Button
                            variant={"primary"}
                            className={styles.learnMoreButton}
                        >
                            Learn more
                        </Button>
                    </Link>
                </div>
            </div>

            <DataSection />
        </div>
    );
};

const DataSection = () => {
    const { data, error, isLoading } = useSWR("/api/frontpagedata", fetcher);

    if (error) return <div>Whoops, something went wrong...</div>;

    let runs;
    let gamestats;

    if (data) {
        runs = data.runs;
        gamestats = data.gamestats;
    }

    return (
        <div>
            <Row className={styles.dataTitle}>
                <Col xl={6} lg={12} className={styles.dataContainer}>
                    <h2>Recent Personal Bests</h2>
                    {data && <DataHolder runs={runs} />}
                    {!data && isLoading && <SkeletonPersonalBests />}
                </Col>
                <Col
                    xl={6}
                    lg={12}
                    className={`${styles.dataContainer} ${styles.dataContainerBottom}`}
                >
                    <h2>Popular Games</h2>
                    {data && <PopularGames gamestats={gamestats} />}
                    {!data && isLoading && <SkeletonPopularGames />}
                </Col>
            </Row>
        </div>
    );
};

export default Home;
