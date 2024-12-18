import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'

function App() {
  const { 
    fromLanguage, 
    toLanguage, 
    interchangesLanguage,
    setFromLanguage,
    setToLanguage,
  } = useStore()

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <Row>
        <Col>
          <h4>From:</h4>
          <LanguageSelector 
            type='from'
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          {fromLanguage}
        </Col>
        <Col>
          <Button variant='link' disabled={fromLanguage===AUTO_LANGUAGE} onClick={interchangesLanguage}>
            <ArrowIcon />
          </Button>
        </Col>
        <Col>
          <h4>To:</h4>
          <LanguageSelector 
            type='to'
            value={toLanguage}
            onChange={setToLanguage}
          />
          {toLanguage}
        </Col>
      </Row>
    </Container>
  )
}

export default App
