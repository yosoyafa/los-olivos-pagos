import React from 'react';
import { DataTable } from 'react-native-paper';
import { View, Text, StyleSheet } from 'react-native';
import NumberFormat from 'react-number-format';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PlanTable = ({ plan, onClose }) => {
    return (
        <View style={{ zIndex: 1 }}>
            <Icon name='close' style={{ position: 'absolute', right: 3, top: 3, zIndex: 999 }} size={20} color={'#b58603'} onPress={() => onClose(false)} />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{plan.Poliza}</Text>
            <DataTable style={{ width: 310 }}>
                {
                    plan.asegurado ?
                        <DataTable.Row>
                            <DataTable.Cell>Asegurado</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.asegurado}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.fechanacimiento ?
                        <DataTable.Row>
                            <DataTable.Cell>Fecha de nacimiento</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.fechanacimiento}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.edad ?
                        <DataTable.Row>
                            <DataTable.Cell>Edad</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.edad}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }


                {
                    plan.tipopoliza ?
                        <DataTable.Row>
                            <DataTable.Cell>Tipo póliza</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.tipopoliza}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.tomador ?
                        <DataTable.Row>
                            <DataTable.Cell>Tomador</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.tomador}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.fechacorte ?
                        <DataTable.Row>
                            <DataTable.Cell>Fecha de corte</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.fechacorte}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.periodofacturacion ?
                        <DataTable.Row>
                            <DataTable.Cell>Periodo de facturación</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.periodofacturacion}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.vigenciadesde ?
                        <DataTable.Row>
                            <DataTable.Cell>Vigencia desde</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.vigenciadesde}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }


                {
                    plan.vigenciahasta ?
                        <DataTable.Row>
                            <DataTable.Cell>Vigencia hasta</DataTable.Cell>
                            <DataTable.Cell numeric>{plan.vigenciahasta}</DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.total ?
                        <DataTable.Row>
                            <DataTable.Cell>Valor contrato</DataTable.Cell>
                            <DataTable.Cell numeric>
                                {<NumberFormat value={plan.total} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} renderText={value => <Text>{value}</Text>} />}
                            </DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.cuota ?
                        <DataTable.Row>
                            <DataTable.Cell>Cuota</DataTable.Cell>
                            <DataTable.Cell numeric>
                                {<NumberFormat value={plan.cuota} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} renderText={value => <Text>{value}</Text>} />}
                            </DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }

                {
                    plan.cartera ?
                        <DataTable.Row>
                            <DataTable.Cell>Cartera</DataTable.Cell>
                            <DataTable.Cell numeric>
                                {<NumberFormat value={plan.cartera} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'$'} renderText={value => <Text>{value}</Text>} />}
                            </DataTable.Cell>
                        </DataTable.Row>
                        :
                        null
                }
                
            </DataTable>
        </View>
    );
};

export default PlanTable;