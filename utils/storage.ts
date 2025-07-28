// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaintenanceRecord } from '../@types';

const STORAGE_KEY = 'maintenanceRecords';

export const saveRecord = async (record: MaintenanceRecord) => {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        const records: MaintenanceRecord[] = existing ? JSON.parse(existing) : [];

        console.log('[saveRecord] Mevcut kayıtlar:', records);
        records.push(record);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
        console.log('[saveRecord] Yeni kayıt eklendi:', record);
        console.log('[saveRecord] Güncellenmiş kayıt listesi kaydedildi.');
    } catch (error) {
        console.error('[saveRecord] HATA:', error);
    }
};

export const getAllRecords = async (): Promise<MaintenanceRecord[]> => {
    try {
        const existing = await AsyncStorage.getItem(STORAGE_KEY);
        const parsed = existing ? JSON.parse(existing) : [];
        console.log('[getAllRecords] Veriler çekildi:', parsed);
        return parsed;
    } catch (error) {
        console.error('[getAllRecords] HATA:', error);
        return [];
    }
};

export const clearRecords = async () => {
    try {
        await AsyncStorage.removeItem(STORAGE_KEY);
        console.log('[clearRecords] Tüm kayıtlar silindi.');
    } catch (error) {
        console.error('[clearRecords] HATA:', error);
    }
};
