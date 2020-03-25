import React, { useState, useEffect, useCallback } from 'react';
import './WordComponent.css';
import axios from 'axios';
import { Card, Divider, Typography, Skeleton, Row, Col, Button, Radio } from 'antd';
const { Text } = Typography;



function WordComponent({ pBaseWord: initialBaseWord, answeredCallback }) {
    const [baseData, setBaseData] = useState(initialBaseWord);
    const [word, setWord] = useState(initialBaseWord.wordMeaning);
    

    const [knowButtonLoading, setKnowButtonLoading] = useState(false);
    const [notKnowButtonLoading, setNotKnowButtonLoading] = useState(false);


    useEffect(() => {
        function handlekeydownEvent(event) {
            const { key, keyCode } = event;
            keyCode === 49 && clickKnow();
            keyCode === 50 && clickNotKnow();
        }

        

        document.addEventListener('keyup', handlekeydownEvent);
        return () => {
            document.removeEventListener('keyup', handlekeydownEvent)
        }
    }, [baseData])

    const clickKnow = () => {
        setKnowButtonLoading(true);
        const request = { ...baseData};
        request.knowCount = request.knowCount + 1;
        axios.post('http://localhost:8080/words/user-words', request)
            .then(function (response) {
                setBaseData(response.data);
                answeredCallback();
                setKnowButtonLoading(false);
            }, function (err) {
                console.log(err);
                setKnowButtonLoading(false);
            });
    }

    const clickNotKnow = () => {
        setNotKnowButtonLoading(true);
        const request = { ...baseData};
        request.notKnowCount = request.notKnowCount + 1;
        axios.post('http://localhost:8080/words/user-words', request)
            .then(function (response) {
                setBaseData(response.data);
                answeredCallback();
                setNotKnowButtonLoading(false);
            }, function (err) {
                console.log(err);
                setNotKnowButtonLoading(false);
            });
    }

    return (
        <div>
            {word && word.examples &&
                <div className="site-card-border-less-wrapper Game-card">
                    {
                        <Card title={word.name} bordered={false} style={{ width: 400 }}>
                            <Row style={{ textAlign: "start" }}>
                                <Col span={12}>
                                    <span style={{ fontWeight: "bold" }}>Speech :</span> <span>{word.partsOfSpeech}</span>
                                </Col>
                                <Col span={12}>
                                    <Text strong>Level : </Text><Text>{word.level}</Text>
                                </Col>
                            </Row>
                            <Divider />
                            <Row style={{ textAlign: "start" }}>
                                <span style={{ fontWeight: "bold" }}>Description : </span><span>{word.description}</span>
                            </Row>
                            <Divider />
                            <Row>
                                <span style={{ fontWeight: "bold" }}>Examples : </span>
                                <span >{word.examples[0]}</span>
                            </Row>
                            <Row style={{ marginTop: 50 }}>
                                <Col span={12}>
                                    <Button size='large' loading={knowButtonLoading} onClick={clickKnow}>Know</Button>
                                </Col>
                                <Col span={12}>
                                    <Button danger size='large' loading={notKnowButtonLoading} onClick={clickNotKnow}>Not Know</Button>
                                </Col>
                            </Row>
                        </Card>
                    }
                </div>
            }
        </div>
    )
}


export default WordComponent;