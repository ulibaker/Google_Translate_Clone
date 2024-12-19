import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { SectionType } from './types.d'

function App() {
  const { 
    fromLanguage, 
    toLanguage, 
    fromText,
    result,
    interchangesLanguage,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
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
          <TextArea
            placeholder='Write something'
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
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
          <TextArea
            placeholder='...'
            type={SectionType.To}
            value={result}
            onChange={setResult}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default App
