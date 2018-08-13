import React from 'react';
import { Card, Row, Col, Rate } from 'antd';
import { formatParcela, formatPreco } from '../../../utils/format';

const FeedProdutos = ({ produtos, produtoClicked }) => {
  return (
    <div>
      <Row gutter={{ xs: 8 }}>
        {produtos.map(produto => (
          <Col key={produto._id} xs={12} sm={8} md={6} lg={4}>
            <Card
              bordered={false}
              onClick={() => produtoClicked(produto._id, produto.nome)}
              hoverable
              style={{
                height: '385px',
                marginBottom: '5px'
              }}
              cover={<img alt={produto.nome} src={produto.imagens[0]} />}
            >
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: 'normal',
                  margin: 0,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: '17px',
                  whiteSpace: 'normal'
                }}
              >
                {produto.nome}
              </p>
              <Rate
                style={{ fontSize: '12px' }}
                allowHalf
                disabled
                defaultValue={produto.avaliacao.mediaEstrelas}
              />
              <small>({produto.avaliacao.numAvaliacoes})</small>
              <h2 style={{ marginBottom: '5px' }}>
                R$ {formatPreco(produto.preco)}
              </h2>
              <span style={{ fontSize: '12px' }}>
                {formatParcela(produto.preco, 8)}
              </span>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeedProdutos;
