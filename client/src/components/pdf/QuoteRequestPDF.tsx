import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import type { Product } from '@shared/schema';
import sumericalogo from '@assets/generated_images/SUMERICA_corporate_logo_design_18758578.png';

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
  infoBlock: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    width: '30%',
  },
  infoValue: {
    fontSize: 10,
    color: '#666',
    width: '70%',
  },
  productSection: {
    backgroundColor: '#f0f8ff',
    padding: 15,
    borderRadius: 5,
    borderLeft: '4 solid #FFD700',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 5,
  },
  productDetail: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  quantityBlock: {
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 3,
    marginTop: 10,
    textAlign: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
  },
  messageBlock: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 5,
    borderLeft: '3 solid #6c757d',
    marginTop: 15,
  },
  messageTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#495057',
    marginBottom: 5,
  },
  messageText: {
    fontSize: 10,
    color: '#6c757d',
    lineHeight: 1.4,
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
  statusBadge: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '5 10',
    borderRadius: 10,
    fontSize: 9,
    textAlign: 'center',
    marginBottom: 15,
  },
});

interface QuoteRequestData {
  name: string;
  email: string;
  company?: string | null;
  phone: string;
  customerMessage?: string | null;
  quantity: number;
}

interface QuoteRequestPDFProps {
  quoteData: QuoteRequestData;
  product: Product;
  quoteId?: string;
}

export default function QuoteRequestPDF({ quoteData, product, quoteId }: QuoteRequestPDFProps) {
  const currentDate = new Date().toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatPrice = (priceCents: number | null, currency: string = 'CLP') => {
    if (!priceCents) return 'Consultar precio';
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: currency,
    }).format(priceCents / 100);
  };

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
            Solicitud de Cotización - {currentDate}
          </Text>
        </View>

        {/* Title */}
        <Text style={styles.title}>Solicitud de Cotización</Text>
        {quoteId && (
          <View style={styles.statusBadge}>
            <Text>Solicitud #{quoteId}</Text>
          </View>
        )}
        <Text style={styles.subtitle}>
          Resumen de la solicitud de cotización enviada
        </Text>

        {/* Customer Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos del Cliente</Text>
          <View style={styles.infoBlock}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Nombre:</Text>
              <Text style={styles.infoValue}>{quoteData.name}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{quoteData.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Teléfono:</Text>
              <Text style={styles.infoValue}>{quoteData.phone}</Text>
            </View>
            {quoteData.company && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Empresa:</Text>
                <Text style={styles.infoValue}>{quoteData.company}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Product Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Producto Cotizado</Text>
          <View style={styles.productSection}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productDetail}>
              <Text style={{ fontWeight: 'bold' }}>Marca: </Text>{product.brand}
            </Text>
            {product.model && (
              <Text style={styles.productDetail}>
                <Text style={{ fontWeight: 'bold' }}>Modelo: </Text>{product.model}
              </Text>
            )}
            {product.code && (
              <Text style={styles.productDetail}>
                <Text style={{ fontWeight: 'bold' }}>Código: </Text>{product.code}
              </Text>
            )}
            <Text style={styles.productDetail}>
              <Text style={{ fontWeight: 'bold' }}>Categoría: </Text>{product.category}
            </Text>
            <Text style={styles.productDetail}>
              <Text style={{ fontWeight: 'bold' }}>Precio de referencia: </Text>
              {formatPrice(product.priceCents, product.currency || 'CLP')}
            </Text>
            
            <View style={styles.quantityBlock}>
              <Text style={styles.quantityText}>
                Cantidad solicitada: {quoteData.quantity} unidades
              </Text>
            </View>
          </View>
        </View>

        {/* Description */}
        {product.description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción del Producto</Text>
            <Text style={{ fontSize: 10, lineHeight: 1.4, color: '#333' }}>
              {product.description}
            </Text>
          </View>
        )}

        {/* Customer Message */}
        {quoteData.customerMessage && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requisitos Adicionales</Text>
            <View style={styles.messageBlock}>
              <Text style={styles.messageTitle}>Mensaje del cliente:</Text>
              <Text style={styles.messageText}>{quoteData.customerMessage}</Text>
            </View>
          </View>
        )}

        {/* Next Steps */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos Pasos</Text>
          <View style={styles.infoBlock}>
            <Text style={{ fontSize: 11, color: '#333', marginBottom: 8, fontWeight: 'bold' }}>
              ¿Qué sucede ahora?
            </Text>
            <Text style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>
              • Nuestro equipo comercial revisará su solicitud en un plazo máximo de 24 horas
            </Text>
            <Text style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>
              • Recibirá una cotización detallada con precios, plazos de entrega y condiciones
            </Text>
            <Text style={{ fontSize: 10, color: '#666', marginBottom: 5 }}>
              • Un ejecutivo se contactará para coordinar detalles específicos de su requerimiento
            </Text>
            <Text style={{ fontSize: 10, color: '#666' }}>
              • Para consultas urgentes, puede contactarnos directamente al teléfono indicado abajo
            </Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          SUMERICA - Equipos Industriales y Climatización{'\n'}
          Teléfono: +56 2 2345 6789 | Email: ventas@sumerica.cl | www.sumerica.cl{'\n'}
          Este documento es una copia de su solicitud de cotización. Guarde este archivo para sus registros.
        </Text>
      </Page>
    </Document>
  );
}