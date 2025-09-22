import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { Product, Dimensions, Specifications } from '@shared/schema';
import sumericalogo from '@assets/generated_images/SUMERICA_corporate_logo_design_18758578.png';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2 solid #FFD700',
    paddingBottom: 15,
  },
  logo: {
    width: 120,
    height: 40,
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
  },
  productDetail: {
    fontSize: 10,
    marginBottom: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 10,
    borderBottom: '1 solid #e0e0e0',
    paddingBottom: 5,
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderBottomStyle: 'solid',
    minHeight: 25,
    alignItems: 'center',
  },
  tableColHeader: {
    width: '40%',
    backgroundColor: '#f8f9fa',
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableCol: {
    width: '60%',
    padding: 8,
    fontSize: 10,
  },
  featureList: {
    marginLeft: 10,
  },
  featureItem: {
    fontSize: 10,
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: 4,
    height: 4,
    backgroundColor: '#FFD700',
    borderRadius: 2,
    marginRight: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#666666',
    borderTop: '1 solid #e0e0e0',
    paddingTop: 10,
  },
  certificationBadge: {
    backgroundColor: '#fff3cd',
    padding: 5,
    marginBottom: 5,
    borderRadius: 3,
    fontSize: 9,
    color: '#856404',
  },
});

interface ProductDatasheetProps {
  product: Product;
}

export default function ProductDatasheet({ product }: ProductDatasheetProps) {
  const formatPrice = (priceCents: number | null, currency: string = 'CLP') => {
    if (!priceCents) return 'Consultar precio';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
    }).format(priceCents / 100);
  };

  const currentDate = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <Image src={sumericalogo} style={styles.logo} />
            <Text style={styles.company}>SUMERICA</Text>
          </View>
          <Text style={{ fontSize: 10, color: '#666666' }}>
            Ficha Técnica - {currentDate}
          </Text>
        </View>

        {/* Product Title */}
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.subtitle}>
          {product.brand} - Modelo {product.model || 'N/A'} - Código: {product.code || 'N/A'}
        </Text>

        {/* Product Basic Info */}
        <View style={styles.productInfo}>
          <View style={{ width: '48%' }}>
            <Text style={styles.productDetail}>
              <Text style={{ fontWeight: 'bold' }}>Categoría: </Text>{product.category}
            </Text>
            <Text style={styles.productDetail}>
              <Text style={{ fontWeight: 'bold' }}>Precio: </Text>
              {formatPrice(product.priceCents, product.currency || 'CLP')}
            </Text>
            <Text style={styles.productDetail}>
              <Text style={{ fontWeight: 'bold' }}>Disponibilidad: </Text>
              {product.availability === 'available' ? 'En stock' : 'Consultar disponibilidad'}
            </Text>
          </View>
          <View style={{ width: '48%' }}>
            {product.series && (
              <Text style={styles.productDetail}>
                <Text style={{ fontWeight: 'bold' }}>Serie: </Text>{product.series}
              </Text>
            )}
            <Text style={styles.productDetail}>
              <Text style={{ fontWeight: 'bold' }}>Cantidad mínima: </Text>
              {product.minOrderQuantity || 1} unidades
            </Text>
            {product.warranty && (
              <Text style={styles.productDetail}>
                <Text style={{ fontWeight: 'bold' }}>Garantía: </Text>{product.warranty}
              </Text>
            )}
          </View>
        </View>

        {/* Description */}
        {product.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción</Text>
            <Text style={{ fontSize: 11, lineHeight: 1.4 }}>
              {product.description}
            </Text>
          </View>
        )}

        {/* Technical Specifications */}
        {product.specifications && typeof product.specifications === 'object' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Especificaciones Técnicas</Text>
            <View style={styles.table}>
              {Object.entries(product.specifications as Specifications).map(([key, value]) => (
                <View style={styles.tableRow} key={key}>
                  <Text style={styles.tableColHeader}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}:
                  </Text>
                  <Text style={styles.tableCol}>{String(value)}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Dimensions */}
        {product.dimensions && typeof product.dimensions === 'object' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dimensiones y Peso</Text>
            <View style={styles.table}>
              {(product.dimensions as Dimensions).width && (
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>Ancho:</Text>
                  <Text style={styles.tableCol}>
                    {(product.dimensions as Dimensions).width} {(product.dimensions as Dimensions).unit || 'cm'}
                  </Text>
                </View>
              )}
              {(product.dimensions as Dimensions).height && (
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>Alto:</Text>
                  <Text style={styles.tableCol}>
                    {(product.dimensions as Dimensions).height} {(product.dimensions as Dimensions).unit || 'cm'}
                  </Text>
                </View>
              )}
              {(product.dimensions as Dimensions).depth && (
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>Profundidad:</Text>
                  <Text style={styles.tableCol}>
                    {(product.dimensions as Dimensions).depth} {(product.dimensions as Dimensions).unit || 'cm'}
                  </Text>
                </View>
              )}
              {(product.dimensions as Dimensions).weight && (
                <View style={styles.tableRow}>
                  <Text style={styles.tableColHeader}>Peso:</Text>
                  <Text style={styles.tableCol}>
                    {(product.dimensions as Dimensions).weight} {(product.dimensions as Dimensions).weightUnit || 'kg'}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Características Principales</Text>
            <View style={styles.featureList}>
              {product.features.map((feature, index) => (
                <View style={styles.featureItem} key={index}>
                  <View style={styles.bullet} />
                  <Text style={{ fontSize: 10 }}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Materials */}
        {product.materials && product.materials.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Materiales de Construcción</Text>
            <View style={styles.featureList}>
              {product.materials.map((material, index) => (
                <View style={styles.featureItem} key={index}>
                  <View style={styles.bullet} />
                  <Text style={{ fontSize: 10 }}>{material}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Applications */}
        {product.applications && product.applications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aplicaciones Recomendadas</Text>
            <View style={styles.featureList}>
              {product.applications.map((app, index) => (
                <View style={styles.featureItem} key={index}>
                  <View style={styles.bullet} />
                  <Text style={{ fontSize: 10 }}>{app}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {product.certifications && product.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificaciones y Normas</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {product.certifications.map((cert, index) => (
                <View style={styles.certificationBadge} key={index}>
                  <Text>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Installation Guide */}
        {product.installationGuide && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Guía de Instalación</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.4 }}>
              {product.installationGuide}
            </Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          SUMERICA - Equipos Industriales y Climatización | www.sumerica.cl | contacto@sumerica.cl{'\n'}
          Este documento es una ficha técnica generada automáticamente. Para cotizaciones oficiales, contacte a nuestro equipo comercial.
        </Text>
      </Page>
    </Document>
  );
}