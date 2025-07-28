// src/components/CheckItem.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { CheckItem as CheckItemType } from '../@types';

interface CheckItemProps {
    label: string;
    value: CheckItemType;
    onChange: (field: 'status' | 'notes', value: boolean | string | null) => void;
}

const CheckItem: React.FC<CheckItemProps> = ({ label, value, onChange }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.buttons}>
                <TouchableOpacity
                    onPress={() => onChange('status', true)}
                    style={[
                        styles.button,
                        value.status === true && styles.buttonActive,
                        value.status === true && styles.buttonSuccess,
                    ]}
                >
                    <MaterialCommunityIcons
                        name="check"
                        size={20}
                        color={value.status === true ? '#FFFFFF' : '#9CA3AF'}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onChange('status', false)}
                    style={[
                        styles.button,
                        value.status === false && styles.buttonActive,
                        value.status === false && styles.buttonError,
                    ]}
                >
                    <MaterialCommunityIcons
                        name="close"
                        size={20}
                        color={value.status === false ? '#FFFFFF' : '#9CA3AF'}
                    />
                </TouchableOpacity>
            </View>
            {value.status === false && (
                <View style={styles.notesContainer}>
                    <MaterialCommunityIcons
                        name="alert-circle"
                        size={16}
                        color="#EF4444"
                        style={styles.alertIcon}
                    />
                    <TextInput
                        style={styles.notesInput}
                        placeholder="Neden false? Detaylı açıklama yazınız..."
                        placeholderTextColor="#9CA3AF"
                        value={value.notes}
                        onChangeText={text => onChange('notes', text)}
                        multiline
                        numberOfLines={2}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
        marginBottom: 8,
    },
    buttons: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        width: 40,
        height: 40,
        borderRadius: 8,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    buttonActive: {
        borderWidth: 0,
    },
    buttonSuccess: {
        backgroundColor: '#10B981',
    },
    buttonError: {
        backgroundColor: '#EF4444',
    },
    notesContainer: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
    },
    alertIcon: {
        marginTop: 4,
    },
    notesInput: {
        flex: 1,
        height: 60,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 8,
        fontSize: 14,
        textAlignVertical: 'top',
        color: '#111827',
        backgroundColor: '#F9FAFB',
    },
});

export default CheckItem;
