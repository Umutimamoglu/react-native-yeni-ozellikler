// src/components/MaintenanceCard.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaintenanceRecord } from '../@types';

interface MaintenanceCardProps {
    record: MaintenanceRecord;
    onPress: () => void;
}

const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ record, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={styles.content}>
                <View
                    style={[
                        styles.iconContainer,
                        record.status === 'completed' ? styles.iconSuccess : styles.iconWarning,
                    ]}
                >
                    <MaterialCommunityIcons
                        name="wrench"
                        size={24}
                        color={record.status === 'completed' ? '#10B981' : '#F59E0B'}
                    />
                </View>

                <View style={styles.info}>
                    <Text style={styles.plate}>{record.plate}</Text>

                    <View style={styles.details}>
                        <View style={styles.detailItem}>
                            <MaterialCommunityIcons name="calendar" size={14} color="#6B7280" />
                            <Text style={styles.detailText}>{record.date}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <MaterialCommunityIcons name="speedometer" size={14} color="#6B7280" />
                            <Text style={styles.detailText}>{record.km} km</Text>
                        </View>
                    </View>

                    <View style={styles.tags}>
                        <View
                            style={[
                                styles.tag,
                                record.type === 'Periyodik' ? styles.tagBlue : styles.tagOrange,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.tagText,
                                    record.type === 'Periyodik' ? styles.tagTextBlue : styles.tagTextOrange,
                                ]}
                            >
                                {record.type}
                            </Text>
                        </View>
                        <View style={styles.technicianTag}>
                            <MaterialCommunityIcons name="account" size={14} color="#6B7280" />
                            <Text style={styles.technicianText}>{record.technician}</Text>
                        </View>
                    </View>
                </View>

                <MaterialCommunityIcons name="chevron-right" size={24} color="#9CA3AF" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    iconSuccess: {
        backgroundColor: '#D1FAE5',
    },
    iconWarning: {
        backgroundColor: '#FEF3C7',
    },
    info: {
        flex: 1,
    },
    plate: {
        fontSize: 18,
        fontWeight: '600',
        color: '#111827',
        marginBottom: 4,
    },
    details: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 8,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    detailText: {
        fontSize: 12,
        color: '#6B7280',
    },
    tags: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    tagBlue: {
        backgroundColor: '#DBEAFE',
    },
    tagOrange: {
        backgroundColor: '#FED7AA',
    },
    tagText: {
        fontSize: 11,
        fontWeight: '600',
    },
    tagTextBlue: {
        color: '#1E40AF',
    },
    tagTextOrange: {
        color: '#C2410C',
    },
    technicianTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    technicianText: {
        fontSize: 12,
        color: '#6B7280',
    },
});

export default MaintenanceCard;