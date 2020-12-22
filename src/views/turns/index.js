import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {buildBreadcrumb} from 'utils/functions';
import {Container, TurnsContainer} from './elements';
import {Card, Typography} from 'antd';
import TurnInit from './components/turn-init';
import TurnEnd from './components/turn-end';

const {Text} = Typography;

const Turn = () => {
  const location = useLocation();
  const [date, setDate] = useState(new Date());
  const [turn, setTurn] = useState(undefined);

  const tick = () => setDate(new Date());

  const turnInit = (values) => {
    const {initialCash} = values;
    const start = date;
    const turnToSet = {start, initialCash}; // Register turn in db and store it to variable.

    setTurn(turnToSet);
  };

  const turnEnd = () => {
    const end = date;
    // Add end attribute to active turn to conclude it.
    setTurn(undefined);
  };

  useEffect(() => {
    const clockIdToSet = setInterval(() => tick(), 1000);
    const turnToSet = undefined; // Try to find a current active turn. If none, leave as undefined.

    setTurn(turnToSet);
    return () => clearInterval(clockIdToSet); // Clear setInterval to avoid memory leaks.
  }, []);

  return (
    <Container>
      {buildBreadcrumb(['menu', location.pathname.substring(1)])}
      <TurnsContainer>
        <Card
          title={
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
              <Text>{`${turn ? 'Terminando' : 'Iniciando'} turno:`}</Text>
              <Text strong>{date.toLocaleTimeString()}</Text>
            </div>
          }
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '40%',
          }}
        >
          {turn && <TurnEnd turn={turn} date={date} turnEnd={turnEnd} />}
          {!turn && <TurnInit turnInit={turnInit} />}
        </Card>
      </TurnsContainer>
    </Container>
  );
};

export default Turn;
