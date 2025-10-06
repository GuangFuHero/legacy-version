import ollama
import dotenv
import os
import json
from pydantic import BaseModel
from prompt.system_prompts import validate_humanresource_prompt
import logging

logger = logging.getLogger(__name__)

dotenv.load_dotenv()


class ValidationResult(BaseModel):
    valid: bool
    reason: str


class OllamaClient:
    def __init__(
        self,
        base_url: str = os.getenv("OLLAMA_URL"),
        model: str = os.getenv("OLLAMA_MODEL"),
    ):
        self.ollama_url = base_url
        self.ollama_model = model
        self.system_prompt = validate_humanresource_prompt
        self.ollama_client = ollama.Client(host=self.ollama_url)

    def get_validation_result(self, message: dict) -> ValidationResult:
        """發送請求到 Ollama"""
        response = self.ollama_client.chat(
            model=self.ollama_model,
            messages=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": json.dumps(message, ensure_ascii=False)},
            ],
            options={"temperature": 0.0},
            format=ValidationResult.model_json_schema(),
        )
        llm_response = ValidationResult.model_validate_json(response.message.content)
        logger.info(f"validation result: {llm_response.valid}")

        return llm_response
