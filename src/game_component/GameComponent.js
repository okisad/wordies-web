import React, { useState, useEffect, useCallback } from 'react';
import './GameComponent.css';
import WordComponent from '../word_component/WordComponent';
import { Card, Skeleton, Row, Col } from 'antd';
import axios from 'axios';

function GameComponent() {
    const [baseData, setBaseData] = useState({});
    const [loading, setLoading] = useState(false);
    const [wordCount, setWordCount] = useState({});

    useEffect(() => {
        fetchWord();
    }, []);

    const fetchWord = () => {
        setLoading(true);
        axios.get('http://localhost:8080/words/random')
            .then(function (response) {
                setBaseData(response.data);
                setLoading(false);
            });


        axios.get('http://localhost:8080/words/count')
            .then(function (response) {
                console.log(response.data);
                setWordCount(response.data);
            });
    }

    const answeredCallback = () => {
        fetchWord();
    }

    return (
        <div className="General-backgroud-color">
            <Row>
                <Col span={20}>
                </Col>

                <Col span={4} style={{ fontSize: 14 }}>
                    Showed Word Count : {wordCount.showedWordCount}/{wordCount.totalWordCount}
                    <br></br>
                    A1 : {wordCount.showedA1Count}/{wordCount.allA1Count} <br></br>
                    A2 : {wordCount.showedA2Count}/{wordCount.allA2Count} <br></br>
                    B1 : {wordCount.showedB1Count}/{wordCount.allB1Count} <br></br>
                    B2 : {wordCount.showedB2Count}/{wordCount.allB2Count} <br></br>
                    C1 : {wordCount.showedC1Count}/{wordCount.allC1Count} <br></br>
                    C2 : {wordCount.showedC2Count}/{wordCount.allC2Count} <br></br>
                </Col>
            </Row>
            <div className="Game-card">
                {!loading && baseData ?
                    <WordComponent pBaseWord={baseData} answeredCallback={answeredCallback}></WordComponent> :
                    <Card style={{ width: 400, marginTop: 16 }} >
                        <Skeleton loading={loading}>
                        </Skeleton>
                    </Card >}
            </div>
        </div>
    )
}

export default GameComponent;