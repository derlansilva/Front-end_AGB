import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const ManifestForm = () => {
  const [showFileInput, setShowFileInput] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    boxVolume: "",
    unit: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFileInput(true);
    console.log("Manifesto Gerado:", formData);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Gerar Manifesto</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Caixa / Volumes</Form.Label>
              <Form.Control
                type="text"
                name="boxVolume"
                value={formData.boxVolume}
                onChange={handleChange}
                placeholder="Digite a quantidade"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Unidade</Form.Label>
              <Form.Control
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                placeholder="Digite a unidade"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Destino</Form.Label>
              <Form.Select name="city" value={formData.city} onChange={handleChange} required>
                <option value="">Selecione...</option>
                <option value="CWB">Curitiba (CWB)</option>
                <option value="CJB">Joinville (CJB)</option>
                <option value="SAE">São Paulo (SAE)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary">
          Gerar Manifesto
        </Button>
      </Form>

      {showFileInput && (
        <div className="mt-4">
          <Form.Group>
            <Form.Label>Carregar Arquivo XML</Form.Label>
            <Form.Control type="file" accept=".xml" onChange={handleFileChange} />
          </Form.Group>
          {selectedFile && <p className="mt-2">Arquivo selecionado: {selectedFile.name}</p>}
        </div>
      )}
    </Container>
  );
};

export default ManifestForm;
