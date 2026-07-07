import { ref } from "vue";
import { utils } from "../utils";

const BASE_URL = "http://localhost:3009";

export const iconMap = {
  pdf: {
    name: "picture_as_pdf",
    wrapper: "bg-error-container/50 border border-error-container/20",
    text: "text-error",
  },
  doc: {
    name: "description",
    wrapper: "bg-secondary-container/30 border border-secondary-container/20",
    text: "text-secondary",
  },
  zip: {
    name: "folder_zip",
    wrapper: "bg-surface-variant/50 border border-surface-variant",
    text: "text-on-surface-variant",
  },
  generic: {
    name: "draft",
    wrapper: "bg-surface-variant/50 border border-surface-variant",
    text: "text-on-surface-variant",
  },
};

function detectIconType(fileName = "", mimeType = "") {
  const ext = (fileName.split(".").pop() || "").toLowerCase();
  if (ext === "pdf" || mimeType === "application/pdf") return "pdf";
  if (["doc", "docx", "txt", "rtf", "odt"].includes(ext)) return "doc";
  if (["zip", "rar", "7z", "tar", "gz"].includes(ext)) return "zip";
  if (mimeType.startsWith("image/")) return "doc";
  return "generic";
}

function formatFileSize(bytes) {
  if (bytes == null) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024)
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatModifiedDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "";
  return `Modified ${date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })}`;
}

function toCardModel(item) {
  return {
    id: item.id,
    name: item.fileName,
    modified: formatModifiedDate(item.createdAt),
    size: formatFileSize(item.size),
    iconType: detectIconType(item.fileName, item.mimeType),
    statusLabel: "Uploaded",
    statusClass: "bg-secondary-fixed text-on-secondary-fixed-variant",
    owner: { type: "initials", value: "You" },
  };
}

export function useDocuments() {
  const { getTokens, uploadFile } = utils();
  const documents = ref([]);
  const loading = ref(false);
  const uploading = ref(false);
  const error = ref(null);

  function authHeaders() {
    const tokens = getTokens();
    return tokens?.accessToken
      ? { Authorization: `Bearer ${tokens.accessToken}` }
      : {};
  }

  async function fetchDocuments() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(`${BASE_URL}/me/documents`, {
        method: "GET",
        headers: { ...authHeaders() },
      });
      if (!res.ok) throw new Error(`Failed to load documents (${res.status})`);
      const items = await res.json();
      documents.value = items.map(toCardModel);
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  async function uploadDocument(file) {
    if (!file) return false;
    uploading.value = true;
    error.value = null;

    try {
      const msg = await uploadFile(file);
      if (msg) {
        error.value = msg;
        return false;
      }
      await fetchDocuments();
      return true;
    } finally {
      uploading.value = false;
    }
  }

  return {
    documents,
    loading,
    uploading,
    error,
    fetchDocuments,
    uploadDocument,
  };
}
