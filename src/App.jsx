import { useState } from 'react';
import './App.css';

// [PT-BR] Exemplo de front-end React para assinatura CMS/CAdES com certificado
// em nuvem (HSM/PSC próprio do cliente). Reaproveita a lógica de campos da
// tela "Assinar CMS (Nuvem)" do Portal SolidSign (SignerCMS.jsx), cortando
// tudo que não é específico deste método: sem login/AuthContext, sem i18n,
// sem co-assinatura (o backend de exemplo não suporta originalFile).
//
// [EN] React front-end example for CMS/CAdES signing with a cloud
// certificate (client's own HSM/PSC). Reuses the field logic from the Portal
// SolidSign "Sign CMS (Cloud)" screen (SignerCMS.jsx), trimmed of everything
// not specific to this method: no login/AuthContext, no i18n, no co-signing
// (the example backend doesn't support originalFile).

const BACKEND_URL = 'http://localhost:8080/api/cms/sign/form';

const PROFILES = ['ADRB', 'ADRT', 'ADRC', 'ADRA', 'CADES_B', 'CADES_T', 'CADES_LT', 'CADES_LTA'];

export default function App() {
  const [baseUrl, setBaseUrl] = useState('https://www.solidsign.com.br');
  const [authorization, setAuthorization] = useState('');
  const [hsmUrl, setHsmUrl] = useState('');
  const [hsmToken, setHsmToken] = useState('');
  const [uuidCert, setUuidCert] = useState('');
  const [documents, setDocuments] = useState([]);

  const [profile, setProfile] = useState('ADRB');
  const [hashAlgorithm, setHashAlgorithm] = useState('SHA256');
  const [signaturePackaging, setSignaturePackaging] = useState('ATTACHED');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    if (documents.length === 0) { setError('Selecione ao menos um documento.'); return; }
    if (!hsmUrl.trim() || !hsmToken.trim() || !uuidCert.trim()) { setError('Preencha URL, token e UUID do certificado do provedor HSM/nuvem.'); return; }
    if (!authorization.trim()) { setError('Informe o token de autorização (Bearer).'); return; }

    setLoading(true);
    try {
      const fd = new FormData();
      documents.forEach((f) => fd.append('document', f));
      fd.append('authorization', authorization.startsWith('Bearer ') ? authorization : `Bearer ${authorization}`);
      fd.append('baseUrl', baseUrl);
      fd.append('cloudCredentials', JSON.stringify({ hsmUrl, hsmToken, uuidCert }));
      fd.append('profile', profile);
      fd.append('hashAlgorithm', hashAlgorithm);
      fd.append('signaturePackaging', signaturePackaging);

      const res = await fetch(BACKEND_URL, { method: 'POST', body: fd });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        let msg = text;
        try { msg = JSON.parse(text)?.message || text; } catch { /* keep raw text */ }
        setError(msg || `Erro HTTP ${res.status}`);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setResult({ url, count: documents.length });
    } catch (err) {
      setError(`Falha ao chamar o backend de exemplo em ${BACKEND_URL} — ele está rodando? (${err.message})`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>Assinar CMS/CAdES — Nuvem / HSM (exemplo React)</h1>
      <p className="subtitle">
        Front-end de exemplo para o back-end <code>exemplo-integracao-cms-cloud</code>.
        A chave privada fica no seu provedor de HSM/PSC — a SolidSign API só pede a
        assinatura do hash a esse provedor.
      </p>

      <form onSubmit={submit} className="form">
        <fieldset>
          <legend>1. Conexão com a SolidSign API</legend>
          <label>Base URL da API
            <input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://www.solidsign.com.br" />
          </label>
          <label>Token de autorização (Bearer)
            <input value={authorization} onChange={(e) => setAuthorization(e.target.value)} placeholder="eyJhbGciOi..." />
          </label>
        </fieldset>

        <fieldset>
          <legend>2. Documento e credenciais do HSM/nuvem</legend>
          <label>Documento(s) — qualquer tipo de arquivo
            <input type="file" multiple onChange={(e) => setDocuments(Array.from(e.target.files))} />
          </label>
          <label>URL do servidor HSM (PSC)
            <input value={hsmUrl} onChange={(e) => setHsmUrl(e.target.value)} placeholder="https://hsm.exemplo.com" />
          </label>
          <label>Token HSM (obtido no provedor)
            <input value={hsmToken} onChange={(e) => setHsmToken(e.target.value)} placeholder="eyJhbGciOi..." />
          </label>
          <label>UUID do certificado
            <input value={uuidCert} onChange={(e) => setUuidCert(e.target.value)} placeholder="a1b2c3d4-e5f6-7890-abcd-ef1234567890" />
          </label>
        </fieldset>

        <fieldset>
          <legend>3. Parâmetros de assinatura</legend>
          <label>Perfil
            <select value={profile} onChange={(e) => setProfile(e.target.value)}>
              {PROFILES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </label>
          <label>Algoritmo de hash
            <select value={hashAlgorithm} onChange={(e) => setHashAlgorithm(e.target.value)}>
              <option value="SHA256">SHA-256</option>
              <option value="SHA512">SHA-512</option>
            </select>
          </label>
          <label>Empacotamento
            <select value={signaturePackaging} onChange={(e) => setSignaturePackaging(e.target.value)}>
              <option value="ATTACHED">ATTACHED (documento embutido no .p7s)</option>
              <option value="DETACHED">DETACHED (assinatura separada)</option>
            </select>
          </label>
        </fieldset>

        <button type="submit" disabled={loading}>{loading ? 'Assinando…' : 'ASSINAR DOCUMENTOS'}</button>
      </form>

      {error && <div className="box error">{error}</div>}

      {result && (
        <div className="box success">
          <h3>Sucesso!</h3>
          <p>{result.count} documento(s) assinado(s).</p>
          <a href={result.url} download="signed_cms.zip" className="download-btn">Baixar ZIP com o(s) .p7s assinado(s)</a>
        </div>
      )}
    </div>
  );
}
