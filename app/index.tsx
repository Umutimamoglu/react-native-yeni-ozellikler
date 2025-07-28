import { getAllRecords } from '@/utils/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { MaintenanceRecord } from '../@types';
import MaintenanceCard from '../components/MaintenanceCard';
import FormScreen from './FormScreen';

const HomeScreen: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentScreen, setCurrentScreen] = useState<'home' | 'form'>('home');
    const [selectedRecord, setSelectedRecord] = useState<number | null>(null);
    const [maintenanceRecords, setMaintenanceRecords] = useState<MaintenanceRecord[]>([]);

    useEffect(() => {
        const loadRecords = async () => {
            const stored = await getAllRecords();
            if (stored) {
                setMaintenanceRecords(stored);
            }
        };
        loadRecords();
    }, []);

    const filteredRecords = maintenanceRecords.filter(record =>
        record.plate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderRecord = ({ item }: { item: MaintenanceRecord }) => (
        <MaintenanceCard
            record={item}
            onPress={() => navigateToForm(item.id)}
        />
    );

    const navigateToForm = (recordId?: number) => {
        if (recordId) setSelectedRecord(recordId);
        setCurrentScreen('form');
    };

    const navigateToHome = async () => {
        setSelectedRecord(null);
        setCurrentScreen('home');

        const updatedRecords = await getAllRecords();
        setMaintenanceRecords(updatedRecords);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFF1F1" />

            {currentScreen === 'form' ? (
                <FormScreen
                    onNavigateBack={navigateToHome}
                    recordId={selectedRecord}
                />
            ) : (
                <>
                    <View style={styles.header}>
                        <View style={styles.headerTitle}>
                            <MaterialCommunityIcons name="bus" size={28} color="#B71C1C" />
                            <Text style={styles.headerText}>Otobüs Bakım Takip</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() => navigateToForm()}
                        >
                            <MaterialCommunityIcons name="plus" size={20} color="#FFFFFF" />
                            <Text style={styles.addButtonText}>Yeni</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.searchContainer}>
                        <View style={styles.searchBar}>
                            <MaterialCommunityIcons name="magnify" size={20} color="#9CA3AF" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Plaka, teknisyen veya bakım türü ara..."
                                placeholderTextColor="#9CA3AF"
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                            />
                        </View>
                        <TouchableOpacity style={styles.filterButton}>
                            <MaterialCommunityIcons name="filter-variant" size={20} color="#374151" />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={filteredRecords}
                        renderItem={renderRecord}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8F8',
        marginTop: 50
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 14,
        backgroundColor: '#FFF1F1',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    headerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
        color: '#B71C1C',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#B71C1C',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },
    addButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 6,
    },
    searchContainer: {
        flexDirection: 'row',
        padding: 16,
        gap: 8,
        backgroundColor: '#FFFFFF',
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        paddingHorizontal: 12,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        color: '#111827',
    },
    filterButton: {
        backgroundColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 40,
    },
});
