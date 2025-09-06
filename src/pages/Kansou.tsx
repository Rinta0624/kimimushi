import React, { useState, useEffect, type FC } from 'react'; // FC (Functional Component) をインポート
import {
  AppBar, Toolbar, Typography, Container, TextField, Button, Box, Card, CardContent, Divider
} from "@mui/material";
import { supabase } from '../supabaseClient'; // './supabaseClient' は '.ts' でも動作します

// --- ここからがTypeScriptでの主な変更点 ---

// 1. Supabaseの 'comments' テーブルのデータ構造に合わせた interface を定義
interface Comment {
  id: number;
  created_at: string;
  content: string;
  author_name: string | null; // NULL許容なので | null を追加
  parent_id: number | null;   // NULL許容なので | null を追加
}

// --- 変更点ここまで ---

const Kansou: FC = () => { // コンポーネントの型を React.FC (Functional Component) として定義
  
  // --- useState に型を指定 ---
  const [comments, setComments] = useState<Comment[]>([]); // Commentオブジェクトの配列
  const [newComment, setNewComment] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('');
  // ---

  // 感想データを取得する関数
  const fetchComments = async () => {
    // Supabaseからのデータ取得時に型を適用
    const { data, error } = await supabase
      .from('comment')
      .select('*')
      .order('created_at', { ascending: false })
      .returns<Comment[]>(); // .returns<T>() で取得データの型を指定

    if (error) {
      console.error('Error fetching comment:', error);
    } else if (data) {
      setComments(data);
    }
  };

  // ページが読み込まれた時に一度だけ感想を取得する
  useEffect(() => {
    fetchComments();
  }, []);

  // 感想を投稿する関数
  // --- イベント(e)の型を React.FormEvent として指定 ---
  const handlePostComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const { error } = await supabase
      .from('comment')
      .insert([{ 
        content: newComment, 
        author_name: authorName.trim() || '名無しさん' 
      }]);

    if (error) {
      console.error('Error posting comment:', error);
    } else {
      setNewComment('');
      setAuthorName('');
      fetchComments();
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            君をむしばむこの力でー感想ページ
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Typography variant="h4" gutterBottom>
          感想ページ
        </Typography>
        <Typography variant="body1" gutterBottom>
          ここでは、君をむしばむこの力でーに関する感想を投稿できます。
        </Typography>
        
        <Box component="form" onSubmit={handlePostComment} noValidate sx={{ mt: 2, mb: 4 }}>
          <TextField
            label="お名前（任意）"
            fullWidth
            margin="normal"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          />
          <TextField
            label="感想をお聞かせください"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 1 }}>
            送信
          </Button>
        </Box>

        <Divider />

        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
          投稿された感想
        </Typography>
        <Box>
          {comments.map((comment) => (
            !comment.parent_id && (
              <Card key={comment.id} sx={{ mb: 2 , textAlign: 'left'}}>
                <CardContent>
                  <Typography variant="subtitle2" color="text.secondary">
                    {comment.author_name} - {new Date(comment.created_at).toLocaleString('ja-JP')}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {comment.content}
                  </Typography>
                  {/* TODO: 返信フォームと返信リストをここに追加 */}
                </CardContent>
              </Card>
            )
          ))}
        </Box>
      </Container>
    <Button color="inherit" href="/"><h2>ホームへ戻る</h2></Button>
    </>
  );
};

export default Kansou;