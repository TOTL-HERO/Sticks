import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { apiFetch } from '../../lib/api';

interface Course { id: string; name: string; location: { city: string; state: string }; }
interface Props {
  data: { homeCourseId: string | null; homeCourseName: string | null };
  onChange: (d: Partial<Props['data']>) => void;
}

export function HomeCourseStep({ data, onChange }: Props) {
  const [query, setQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const search = useCallback(async (t: string) => {
    setQuery(t);
    if (t.length < 2) { setCourses([]); setSearched(false); return; }
    setLoading(true); setSearched(true);
    try {
      const r = await apiFetch<{ courses: Course[] }>('/courses/search?query=' + encodeURIComponent(t));
      setCourses(r.courses ?? []);
    } catch { setCourses([]); }
    finally { setLoading(false); }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Text style={s.title}>Find your clubhouse.</Text>
      <Text style={s.sub}>Select your home course</Text>
      <View style={s.bar}>
        <MaterialCommunityIcons name="magnify" size={20} color="#88938c" />
        <TextInput style={s.input} value={query} onChangeText={search} placeholder="Search courses..." placeholderTextColor="#3f4943" />
        {loading && <ActivityIndicator size="small" color="#84d7af" />}
      </View>
      {data.homeCourseName ? (
        <View style={s.sel}>
          <MaterialCommunityIcons name="check-circle" size={18} color="#84d7af" />
          <Text style={s.selTxt}>{data.homeCourseName}</Text>
        </View>
      ) : null}
      <FlatList data={courses} keyExtractor={i => i.id} keyboardShouldPersistTaps="handled"
        ListEmptyComponent={searched && !loading ? (
          <View style={{ alignItems: 'center', paddingVertical: 24 }}>
            <Text style={{ color: '#bec9c1', fontFamily: 'Manrope' }}>No courses found</Text>
          </View>
        ) : null}
        renderItem={({ item }) => {
          const on = data.homeCourseId === item.id;
          return (
            <TouchableOpacity onPress={() => onChange({ homeCourseId: item.id, homeCourseName: item.name })}>
              <View style={[s.card, on && s.cardOn]}>
                <View style={s.ico}><MaterialCommunityIcons name="golf" size={22} color="#006747" /></View>
                <View style={{ flex: 1 }}>
                  <Text style={s.name}>{item.name}</Text>
                  <Text style={s.loc}>{item.location.city}, {item.location.state}</Text>
                </View>
                {on && <MaterialCommunityIcons name="check-circle" size={22} color="#84d7af" />}
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontFamily: 'Newsreader', fontSize: 32, fontStyle: 'italic', color: '#dfe4dd', marginBottom: 8 },
  sub: { fontFamily: 'Manrope', fontSize: 13, color: '#bec9c1', marginBottom: 20 },
  bar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c211c', borderRadius: 12, borderWidth: 1, borderColor: '#3f4943', paddingHorizontal: 12, marginBottom: 16 },
  input: { flex: 1, paddingVertical: 12, paddingHorizontal: 8, color: '#dfe4dd', fontFamily: 'Manrope', fontSize: 14 },
  sel: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: 'rgba(132,215,175,0.1)', padding: 12, borderRadius: 8, marginBottom: 16 },
  selTxt: { fontFamily: 'Manrope', fontSize: 13, fontWeight: '600', color: '#84d7af', flex: 1 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c211c', borderRadius: 12, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: '#3f4943' },
  cardOn: { borderColor: '#84d7af', borderWidth: 2, backgroundColor: 'rgba(132,215,175,0.08)' },
  ico: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#101511', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  name: { fontFamily: 'Manrope', fontSize: 14, fontWeight: '600', color: '#dfe4dd' },
  loc: { fontFamily: 'Manrope', fontSize: 12, color: '#bec9c1' },
});
