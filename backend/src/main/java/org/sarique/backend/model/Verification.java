package org.sarique.backend.model;


import jakarta.persistence.Embeddable;
import lombok.Data;

import java.time.LocalDateTime;

@Embeddable
@Data
public class Verification {
    private Boolean status = false;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private String planType;
}
