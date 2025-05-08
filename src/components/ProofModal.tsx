
import React, { useState } from "react";

type ProofModalProps = {
  open: boolean;
  onSubmit: (proof: string) => void;
  onClose: () => void;
};

const ProofModal: React.FC<ProofModalProps> = ({ open, onSubmit, onClose }) => {
  const [proof, setProof] = useState("");

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-6 min-w-[320px]">
        <h3 className="system-title text-lg mb-1">Submit Quest Proof</h3>
        <p className="text-gray-300 text-sm mb-4">Describe what you did (e.g., "Did 20 pushups") as proof of completion.</p>
        <textarea
          className="w-full p-2 mb-3 rounded bg-gray-800 border border-gray-600 text-white"
          rows={3}
          value={proof}
          onChange={e => setProof(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="system-button px-3 py-1 text-xs bg-gray-500 hover:bg-gray-600"
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="system-button px-3 py-1 text-xs"
            onClick={() => {
              onSubmit(proof);
              setProof("");
            }}
            disabled={proof.trim() === ""}
          >
            Submit Proof
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProofModal;
