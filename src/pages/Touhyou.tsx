import React, { useState, useEffect, type FC } from 'react';
import {
  AppBar, Toolbar, Typography, Container, Grid, Card, CardContent, Button, Box, CircularProgress, LinearProgress
} from "@mui/material";
import { supabase } from '../supabaseClient';

// キャラクターの型定義
interface Character {
  id: number;
  name: string;
  image_url: string | null;
  votes: number;
}

const Touhyou: FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [hasVoted, setHasVoted] = useState<boolean>(false); // 多重投票防止用

  // キャラクターデータを取得する関数
  const fetchCharacters = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('characters')
      .select('*')
      .order('votes', { ascending: false }); // 票数が多い順に並び替え

    if (error) {
      console.error('Error fetching characters:', error);
    } else if (data) {
      setCharacters(data);
      // 全体の合計票数を計算
      const total = data.reduce((sum, char) => sum + char.votes, 0);
      setTotalVotes(total);
    }
    setIsLoading(false);
  };

  // 投票する関数
  const handleVote = async (characterId: number) => {
    if (hasVoted) {
      alert('すでに投票済みです。');
      return;
    }

    // SupabaseのRPC関数を呼び出す
    const { error } = await supabase.rpc('increment_votes', {
      character_id: characterId
    });

    if (error) {
      console.error('Error voting:', error);
    } else {
      alert('投票しました！');
      setHasVoted(true); // 投票済みのフラグを立てる
      localStorage.setItem('hasVotedInPoll', 'true'); // localStorageにも記録
      fetchCharacters(); // 投票後に最新の票数を再取得
    }
  };
  
  // ページ読み込み時にキャラクター取得＆投票済みかチェック
  useEffect(() => {
    fetchCharacters();
    if (localStorage.getItem('hasVotedInPoll') === 'true') {
      setHasVoted(true);
    }
  }, []);

  return (
    <>
      <AppBar position="static">{/* ... */}</AppBar>
      <Container sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          キャラクター人気投票
        </Typography>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {characters.map((character) => {
              const votePercentage = totalVotes > 0 ? (character.votes / totalVotes) * 100 : 0;
              return (
                <Grid item xs={12} key={character.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={character.image_url || 'https://via.placeholder.com/100'} alt={character.name} width="100" height="100" style={{ objectFit: 'cover', marginRight: '16px' }} />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h5">{character.name}</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                            {character.votes} 票
                          </Typography>
                          <Box sx={{ width: '100%', mt: 1 }}>
                            <LinearProgress variant="determinate" value={votePercentage} />
                          </Box>
                        </Box>
                        <Button
                          variant="contained"
                          onClick={() => handleVote(character.id)}
                          disabled={hasVoted} // 投票済みならボタンを無効化
                          sx={{ ml: 2 }}
                        >
                          投票
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
      <Button color="inherit" href="/"><h2>ホームへ戻る</h2></Button>
    </>
  );
};

export default Touhyou;